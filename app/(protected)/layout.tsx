import Nav from "@/components/Nav";

export default function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Nav />
			{children}
		</>
	);
}
