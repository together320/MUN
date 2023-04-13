import $ from "jquery";

export const GetCollectionList = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "GET",
			url : `http://api-mainnet.magiceden.dev/v2/collections`,
			data : {
				'offset' : 0,
                'limit' : 500
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}