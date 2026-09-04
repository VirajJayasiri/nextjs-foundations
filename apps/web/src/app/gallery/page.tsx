import Image from "next/image";

// TODO: Convert to next/image (Section 4 Lesson 4)

const heroImage = "https://picsum.photos/1200/400?random=hero";

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

      {/* Hero Image */}
      <div className="relative mb-8 aspect-[3/1] w-full overflow-hidden rounded-lg">
        <Image
          src={heroImage}
          alt="Gallery hero image"
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {images.map((image, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={80}
              sizes="(max-width: 768px) 50vw, 400px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <section className="mt-8 rounded bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">Performance Benefits</h2>
        <ul className="list-inside list-disc text-gray-600 text-sm">
          <li>✓ Images optimized (automatic WebP/AVIF)</li>
          <li>✓ Lazy loading for gallery images</li>
          <li>✓ Responsive sizing with sizes prop</li>
          <li>✓ No layout shift with fill + aspect ratio</li>
          <li>✓ Hero image preloaded for fast loading</li>
        </ul>
      </section>
    </main>
  );
}
