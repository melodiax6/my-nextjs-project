import Link from "next/link";
import Image, { StaticImageData } from 'next/image';


interface DumplingsCardProps {
  kind: "meat" | "sweet" | "vege",
  image: StaticImageData,
  title: string
}

export default function DumplingsCard({kind, image, title} :DumplingsCardProps) {
  return (
    <Link href={`/recipes/?kind=${kind}`}>
      <div className="relative group cursor-pointer">
        <div className="relative transform transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
          <Image
            src={image}
            alt={title}
            width={1600}
            height={300}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}