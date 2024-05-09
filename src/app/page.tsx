import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/d3ad2f91-6e65-4c75-a95f-7cfe93603e7a-sd21jf.jpg",
  "https://utfs.io/f/52a4839a-3109-49d1-a13a-ebbf20305ada-xq4ses.jpg",
  "https://utfs.io/f/52d4f6d2-8d81-4528-84c8-235628845272-a24lat.jpg",
  "https://utfs.io/f/5a0b2b04-fd49-464e-aa70-08d2dc471db5-hdf3u3.jpg",
];

const mockImages = mockUrls.map((url, index) => ({ id: index + 1, url }));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
