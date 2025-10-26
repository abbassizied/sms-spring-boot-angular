package io.github.abbassizied.sms.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;

import io.github.abbassizied.sms.dtos.responses.ImageResponse;
import io.github.abbassizied.sms.entities.Image;

@Mapper(componentModel = "spring")
public interface ImageMapper {

	ImageResponse toImageResponse(Image image);

	// Return ArrayList instead of List.of()
	default List<ImageResponse> toImageResponseList(List<Image> images) {
		if (images == null) {
			return new ArrayList<>(); // Use ArrayList instead of List.of()
		}
		return images.stream().map(this::toImageResponse).collect(Collectors.toList()); // This returns ArrayList
	}

}