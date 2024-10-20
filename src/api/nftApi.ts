import axios from 'axios';

const API_BASE_URL = 'https://api.storychain.io'; // Replace with the actual Story chain API URL

export const fetchNFTs = async (contractAddress: string, page: number = 1, limit: number = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nfts`, {
      params: {
        contractAddress,
        page,
        limit,
      },
    });
    return response.data.nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
};