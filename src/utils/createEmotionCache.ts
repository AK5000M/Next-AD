import createCache from "@emotion/cache";

// This utility function creates a new Emotion cache instance.
export default function createEmotionCache() {
	return createCache({ key: "css" });
}
