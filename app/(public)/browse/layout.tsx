import Nav from '@/components/Nav';

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
