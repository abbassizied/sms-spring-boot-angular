package io.github.abbassizied.sms.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {

	String saveFile(MultipartFile file) throws IOException;

	public String updateFile(MultipartFile file, String oldFilePath) throws IOException;

	List<String> saveFiles(List<MultipartFile> files) throws IOException;

	void deleteFile(String filePath);

	void deleteFiles(List<String> filePaths);
}
