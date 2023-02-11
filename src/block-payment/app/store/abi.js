export const abi = [
	{
		inputs: [
			{
				internalType: "string[]",
				name: "urlPosts",
				type: "string[]",
			},
		],
		name: "claim",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "baseUrl",
				type: "string",
			},
			{
				internalType: "string",
				name: "id",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "createPost",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "baseUrl",
				type: "string",
			},
			{
				internalType: "string",
				name: "id",
				type: "string",
			},
		],
		name: "deposit",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "balancesOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "donated",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getDonatedPost",
		outputs: [
			{
				internalType: "string[]",
				name: "",
				type: "string[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "baseUrl",
				type: "string",
			},
			{
				internalType: "string",
				name: "id",
				type: "string",
			},
		],
		name: "getPost",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isClaimed",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "donateAmount",
						type: "uint256",
					},
				],
				internalType: "struct Donate.Post",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "baseUrl",
				type: "string",
			},
			{
				internalType: "string",
				name: "id",
				type: "string",
			},
			{
				internalType: "address",
				name: "addr",
				type: "address",
			},
		],
		name: "hasDonateForPost",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "idCount",
		outputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		name: "posts",
		outputs: [
			{
				internalType: "address",
				name: "creator",
				type: "address",
			},
			{
				internalType: "bool",
				name: "isClaimed",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "donateAmount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
