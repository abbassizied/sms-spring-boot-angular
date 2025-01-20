package io.github.abbassizied.sms.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Random;

@Service
public class FileServiceImpl implements FileService {

	private final Path root = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/uploads");

	@Value("${upload.base-url}")
	private String uploadBaseUrl; // Injecting the value from application.properties

	// Method to save a single file
	@Override
	public String saveFile(MultipartFile file) throws IOException {

		if (file == null || file.isEmpty())
			return null;

		// Generate random file name
		String fileName = getSaltString() + "_" + file.getOriginalFilename();

		// Create directories if they don't exist
		Path filePath = Paths.get(root.toString(), fileName);
		Files.createDirectories(filePath.getParent());

		// Save the file
		try {
			Files.write(filePath, file.getBytes());
		} catch (IOException e) {
			throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
		}

		// Return the full URL path
		return uploadBaseUrl + fileName; // Concatenate the base URL and file name
	}

	// Method to save multiple files
	@Override
	public List<String> saveFiles(List<MultipartFile> files) throws IOException {
		if (files == null || files.isEmpty())
			return List.of();
		return files.stream().map(file -> {
			try {
				return saveFile(file);
			} catch (IOException e) {
				throw new RuntimeException("File save failed", e);
			}
		}).toList();
	}

	// Method to delete a single file
	@Override
	public void deleteFile(String fileUrl) {
		if (fileUrl != null && !fileUrl.isEmpty()) {
			try {
				// Extract the file name from the URL
				String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

				// Construct the local file system path
				Path filePath = Paths.get(root.toString(), fileName);

				// Delete the file
				Files.deleteIfExists(filePath);
			} catch (IOException e) {
				throw new RuntimeException("Failed to delete file: " + fileUrl, e);
			}
		}
	}

	// Method to delete multiple files
	@Override
	public void deleteFiles(List<String> filePaths) {
		if (filePaths != null && !filePaths.isEmpty()) {
			filePaths.forEach(this::deleteFile);
		}
	}

	// Method to delete an old file and upload a new file
	public String updateFile(MultipartFile file, String oldFilePath) throws IOException {
		if (file == null)
			return oldFilePath;

		// Step 1: Delete old file
		if (oldFilePath != null && !oldFilePath.isEmpty()) {
			deleteFile(oldFilePath);
		}

		// Step 2: Save the new file
		return saveFile(file);
	}

	// Method to generate a random string (used for random file names)
	private String getSaltString() {
		String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		while (salt.length() < 18) { // length of the random string
			int index = (int) (rnd.nextFloat() * SALTCHARS.length());
			salt.append(SALTCHARS.charAt(index));
		}
		return salt.toString();
	}

}
