import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#080a12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'PromptSUNO - Music Intelligence For Everyone | Learn, Build & Fix AI Music',
  description: 'sunov6.wiki gives you the tools, prompts, and inspiration to create, explore, and diagnose music with Suno v6.4 AI. Learn with step-by-step guides, build your sound with the prompt studio, and fix songs with Prompt Dr.',
  keywords: [
    'Suno AI',
    'Prompt Doctor',
    'AI music generator',
    'Suno v6.4',
    'Prompt engineering',
    'Music stems mixer',
    'AI audio production',
    'Lyric generator',
    'Fix robotic vocals',
    'sunov6.wiki'
  ],
  authors: [{ name: 'PromptSUNO Research Lab' }],
  creator: 'PromptSUNO',
  publisher: 'PromptSUNO',
  metadataBase: new URL('https://sunov6.wiki'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PromptSUNO - Music Intelligence For Everyone',
    description: 'Learn SUNO with guides, build your sound with the interactive prompt tool, and diagnose & fix songs with Prompt Dr.',
    url: 'https://sunov6.wiki',
    siteName: 'PromptSUNO',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero_producer.jpg',
        width: 1200,
        height: 630,
        alt: 'PromptSUNO AI Music Intelligence Studio - Producer at DJ Synthesizer Console',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptSUNO - Music Intelligence For Everyone',
    description: 'Learn SUNO with guides, build your sound with the interactive prompt tool, and diagnose & fix songs with Prompt Dr.',
    images: ['/images/hero_producer.jpg'],
    creator: '@promptsuno',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://sunov6.wiki/#webapp',
      name: 'PromptSUNO',
      url: 'https://sunov6.wiki',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires HTML5 audio and JavaScript support',
      description: 'Audio intelligence platform offering prompt engineering guides, 4-track stem mixing, and real-time audio diagnostics for generative music.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Learn SUNO with interactive guides and examples',
        'Build custom music prompts with BPM and harmonic key constraints',
        'Prompt Dr. audio pathology and artifact remedies',
        'Lossless 48kHz neural stem separation'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://sunov6.wiki/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I fix robotic or metallic vocals in Suno AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To cure metallic robot vocals, inject acoustic room descriptors like [natural vocal timbre], [warm tube preamp], and [intimate close-mic]. Ensure verse and chorus have differing syllable cadences.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I prevent my Suno song from cutting off abruptly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Add an explicit [Outro - Decelerando] or [Reverb decay, acoustic piano fadeout, final chord ring out] metatag at the end of your lyric structure.'
          }
        },
        {
          '@type': 'Question',
          name: 'What sample rate does the Suno v6.4 audio engine support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suno v6.4 processes neural audio with a 48kHz lossless stereo output pipeline with 24-bit dynamic range and discrete 4-track stem separation.'
          }
        }
      ]
    },
    {
      '@type': 'MusicRecording',
      '@id': 'https://sunov6.wiki/#track-echoes',
      name: 'Echoes of Horizon',
      byArtist: {
        '@type': 'MusicGroup',
        name: 'PromptSUNO Collective'
      },
      genre: 'Cinematic Synth Rock',
      duration: 'PT3M42S',
      inAlbum: {
        '@type': 'MusicAlbum',
        name: 'Neural Horizons v6.4'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#080a12] text-[#e1e1ee] antialiased selection:bg-[#c8ff00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
