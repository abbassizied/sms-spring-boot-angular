package io.github.abbassizied.sms.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;

import io.github.abbassizied.sms.dtos.responses.ImageResponse;
import io.github.abbassizied.sms.entities.Image;

@Mapper(componentModel = "spring")
public interface ImageMapper {
	ImageResponse toImageResponse(Image image);

	default List<ImageResponse> ImageListToImageResponseList(List<Image> images) {
		if (images == null) {
			return List.of();
		}
		return images.stream().map(this::toImageResponse).collect(Collectors.toList());
	}
}