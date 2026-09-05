import Image from "next/image";

const heroImage = "https://picsum.photos/1200/400?random=hero";

// Placeholder blur data URL (32x11px gray image encoded as data URI)
// For production, use actual blur hash or low-res placeholder URL
const blurPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Crect fill='%23e5e5e5'/%3E%3C/svg%3E";

const images = [
  { src: "https://picsum.photos/800/600?random=1", alt: "Mountain landscape" },
  { src: "https://picsum.photos/800/600?random=2", alt: "Ocean sunset" },
  { src: "https://picsum.photos/800/600?random=3", alt: "Forest path" },
  { src: "https://picsum.photos/800/600?random=4", alt: "City skyline" },
];

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 font-bold text-3xl">Photo Gallery</h1>

      {/* Hero Image - Eagerly loaded with priority */}
      <div className="relative mb-8 aspect-[3/1] w-full overflow-hidden rounded-lg">
        <Image
          src={heroImage}
          alt="Gallery hero image"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurPlaceholder}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {images.map((image, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurPlaceholder}
            />
          </div>
        ))}
      </div>

      <section className="mt-8 rounded bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">Advanced Image Optimization</h2>
        <ul className="list-inside list-disc text-gray-600 text-sm">
          <li>✓ Automatic format negotiation (WebP, AVIF)</li>
          <li>✓ Blur placeholder strategy for perceived performance</li>
          <li>✓ Hero image eager-loaded with priority prop</li>
          <li>✓ Gallery images lazy-loaded on scroll</li>
          <li>✓ Quality values optimized (85 hero, 80 gallery)</li>
          <li>✓ Responsive sizes for different breakpoints</li>
          <li>✓ No layout shift with fill + aspect ratio</li>
          <li>✓ deviceSizes and imageSizes in next.config</li>
          <li>✓ Proper srcset generation via Image component</li>
        </ul>
      </section>
    </main>
  );
}
