export const GetCollectionList = async () => {
	//https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=1000&window=1d
	return await fetch("https://api-mainnet.magiceden.dev/v2/collections?offset=0&limit=500", {method: "GET"}).then(res => res.json());
}

export const getCollectionStats = async(collectionSymbol) => {
	return await fetch("https://api-mainnet.magiceden.dev/v2/collections/" + collectionSymbol + "/stats", {method: "GET"}).then(res => res.json());
}