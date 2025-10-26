package io.github.abbassizied.sms.mappers;

import java.util.List;
import org.mapstruct.Mapper;

import io.github.abbassizied.sms.dtos.responses.ImageResponse;
import io.github.abbassizied.sms.entities.Image;

@Mapper(componentModel = "spring")
public interface ImageMapper {

	ImageResponse toImageResponse(Image image);

	// Let MapStruct handle the collection mapping automatically
	List<ImageResponse> toImageResponseList(List<Image> images);

	/*
	 * default List<ImageResponse> imageListToImageResponseList(List<Image> images)
	 * {
	 * if (images == null) {
	 * return List.of();
	 * }
	 * return images.stream().map(this::toImageResponse).toList();
	 * }
	 */

}