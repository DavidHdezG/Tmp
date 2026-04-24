import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

type ArtistData = {
  type: 'artist';
  name: string;
  artistType: string;
  bio: string;
  photo?: string;
  website?: string;
};

type EventData = {
  type: 'event';
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
};

type ModalData = ArtistData | EventData | null;

export default function CardModal() {
  const [data, setData] = useState<ModalData>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) { setData(null); return; }
    gsap.to(panel,   { opacity: 0, y: 24, duration: 0.22, ease: 'power2.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.28, ease: 'power1.in', onComplete: () => setData(null) });
  }, []);

  // Listen for open events from cards
  useEffect(() => {
    const handler = (e: Event) => setData((e as CustomEvent<ModalData>).detail);
    window.addEventListener('open-card-modal', handler);
    return () => window.removeEventListener('open-card-modal', handler);
  }, []);

  // Animate in when data arrives; lock scroll + Escape
  useEffect(() => {
    if (!data) return;
    // Compensate scrollbar width before hiding to prevent layout shift
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarW}px`;
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' });
    gsap.fromTo(panelRef.current,   { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' });

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [data, close]);

  if (!data) return null;

  return (
    <div
      ref={overlayRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-end sm:items-center justify-center sm:p-6 bg-[#1a1a1a]/75"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        style={{ opacity: 0, willChange: 'transform, opacity' }}
        className="relative bg-[#faf7f2] w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-2xl border-t-4 border-t-primary"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center border border-[#1a1a1a]/20 hover:border-primary cursor-pointer text-[#1a1a1a] hover:text-primary bg-[#faf7f2] transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {data.type === 'artist' && <ArtistContent data={data} />}
        {data.type === 'event'  && <EventContent  data={data} />}
      </div>
    </div>
  );
}

function normalizeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function ArtistContent({ data }: { data: ArtistData }) {
  return (
    <>
      {data.photo && (
        <div className="aspect-video overflow-hidden">
          <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-8 sm:p-10">
        <p className="font-sans text-xs font-semibold tracking-widest uppercase text-primary mb-3">
          {data.artistType}
        </p>
        <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-6">
          {data.name}
        </h2>
        <div className="w-12 h-px bg-primary mb-6" />
        <p className="text-[#6b6b6b] leading-relaxed whitespace-pre-line">{data.bio}</p>
        {data.website && (
          <a
            href={normalizeUrl(data.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-[#ff8c3a] font-sans text-xs font-semibold tracking-widest uppercase text-[#ff8c3a] hover:bg-[#ff8c3a] hover:text-white no-underline transition-colors duration-200"
          >
            View Portfolio →
          </a>
        )}
      </div>
    </>
  );
}

function EventContent({ data }: { data: EventData }) {
  const formatted = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      {data.image && (
        <div className="aspect-video overflow-hidden">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-8 sm:p-10">
        <p className="font-sans text-xs font-semibold tracking-widest uppercase text-[#ff8c3a] mb-3">
          {formatted}
        </p>
        <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-6">
          {data.title}
        </h2>
        <div className="w-12 h-px bg-[#ff8c3a] mb-6" />
        <div className="bg-white border border-[#f0ebe5] px-6 py-4 flex flex-col gap-3 mb-8">
          <div className="flex items-start gap-3">
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#ff8c3a] w-20 shrink-0 pt-0.5">Time</span>
            <span className="text-[#1a1a1a] text-sm">{data.time}</span>
          </div>
          <div className="border-t border-[#f0ebe5]" />
          <div className="flex items-start gap-3">
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#ff8c3a] w-20 shrink-0 pt-0.5">Location</span>
            <span className="text-[#1a1a1a] text-sm">{data.location}</span>
          </div>
        </div>
        <p className="text-[#6b6b6b] leading-relaxed whitespace-pre-line">{data.description}</p>
      </div>
    </>
  );
}
