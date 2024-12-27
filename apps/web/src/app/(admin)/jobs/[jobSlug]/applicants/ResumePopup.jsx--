'use client';

import { useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const ResumePopup = ({ isOpen, onClose }) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	if (!isOpen) return null;

	return (
		<dialog className="modal modal-open">
			<div className="modal-box max-w-4xl h-[80vh] overflow-y-auto">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
						✕
					</button>
				</form>
				<div className="mt-4">
					<Document
						file="https://1xqijlcbl8outl7j.public.blob.vercel-storage.com/SACHIN-HANS%20RESUME(1%20YEAR%20%20MERN%20STACK)-Zn33cd0eFxSP8AYEHl2vN9gwdLGhxN.PDF"
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} renderTextLayer={false} width={Math.min(window.innerWidth * 0.8, 800)} />
					</Document>
					{numPages && (
						<div className="flex justify-center gap-4 mt-4">
							<button
								className="btn btn-primary btn-sm"
								disabled={pageNumber <= 1}
								onClick={() => setPageNumber(pageNumber - 1)}
							>
								Previous
							</button>
							<p>
								Page {pageNumber} of {numPages}
							</p>
							<button
								className="btn btn-primary btn-sm"
								disabled={pageNumber >= numPages}
								onClick={() => setPageNumber(pageNumber + 1)}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button onClick={onClose}>close</button>
			</form>
		</dialog>
	);
};

export default ResumePopup;
