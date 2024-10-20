import React from 'react';
import { ExternalLink } from 'lucide-react';

interface NFTCardProps {
  nft: {
    name: string;
    image: string;
    description: string;
    tokenId: string;
  };
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{nft.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{nft.description.slice(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-indigo-400">#{nft.tokenId}</span>
          <a
            href={`https://storychain.io/nft/${nft.tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition duration-300"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;