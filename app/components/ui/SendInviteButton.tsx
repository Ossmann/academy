'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface SendInviteButton {
  loading: boolean;
  text: string;
}

export default function SendInviteButton({ loading, text }: SendInviteButton) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 border border-gray-600/50 py-2 px-4 rounded-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {loading ? (
        'Creating...'
      ) : (
        <>
          <Image 
            src="/icons/paper-plane.svg" 
            alt="Send" 
            width={20}
            height={20}
            className="w-6 h-6"
          />
          {text}
        </>
      )}
    </button>
  );
}
