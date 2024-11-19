interface RowProps {
  children: React.ReactNode;
}

export default function Row({children}: RowProps) {
 return <div className="w-full lg:max-w-7xl mx-auto px-4 xl:px-1">{children}</div>

}