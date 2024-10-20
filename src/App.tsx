import React, { useState, useEffect } from 'react';
import { Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import NFTCard from './components/NFTCard';
import { fetchNFTs } from './api/nftApi';

function App() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contractAddress, setContractAddress] = useState('0xB356236189B49c67E359Ff1c60cb2A40b1aB7102');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadNFTs();
  }, [contractAddress, page]);

  const loadNFTs = async () => {
    setLoading(true);
    try {
      const fetchedNFTs = await fetchNFTs(contractAddress, page);
      setNfts(fetchedNFTs);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <header className="bg-black bg-opacity-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Layers className="mr-2" /> NFT Gallery
          </h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter contract address"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button
              onClick={loadNFTs}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition duration-300"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nfts.map((nft, index) => (
                <NFTCard key={index} nft={nft} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                disabled={page === 1}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-l-md transition duration-300 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="bg-gray-800 px-4 py-2">{page}</span>
              <button
                onClick={() => setPage(page + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;