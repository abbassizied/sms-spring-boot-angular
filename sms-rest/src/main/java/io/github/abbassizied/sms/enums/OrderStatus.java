package io.github.abbassizied.sms.enums;

public enum OrderStatus {
	IN_PROGRESS, CANCELED, COMPLETED;

	@Override
	public String toString() {
		switch (this) {
		case IN_PROGRESS:
			return "In Progress";
		case CANCELED:
			return "Canceled";
		case COMPLETED:
			return "Completed";
		default:
			return super.toString();
		}
	}
}
