export default function Pagination() {
	return (
		<div className="flex justify-between items-center mt-6">
			<span className="text-sm text-base-content/60">Showing 1-10 of 24 jobs</span>
			<div className="join">
				<button className="join-item btn btn-sm">«</button>
				<button className="join-item btn btn-sm btn-active">1</button>
				<button className="join-item btn btn-sm">2</button>
				<button className="join-item btn btn-sm">3</button>
				<button className="join-item btn btn-sm">»</button>
			</div>
		</div>
	);
}
