"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

interface Notice {
	id: number;
	title: string;
	content: string;
	imageUrl: string | null;
	published: boolean;
	createdAt: string;
	updatedAt: string;
}

const API_URL = "/api/notice";

export default function AdminNotice() {
	const [notices, setNotices] = useState<Notice[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [selected, setSelected] = useState<Notice | null>(null);
	const [error, setError] = useState("");

	const [form, setForm] = useState({
		title: "",
		content: "",
		published: false,
		image: null as File | null,
	});

	const fetchNotices = async () => {
		setLoading(true);
		setError("");

		try {
			const res = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${Cookies.get("adminToken")}`,
				},
			});

			setNotices(res.data.data);
		} catch (err) {
			console.error(err);
			setError("Failed to load notices");
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchNotices();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setForm({ ...form, image: e.target.files[0] });
		}
	};

	const resetForm = () => {
		setSelected(null);
		setForm({
			title: "",
			content: "",
			published: false,
			image: null,
		});
	};

	const handleSubmit = async () => {
		if (!form.title.trim()) return alert("Please enter title");
		if (!form.content.trim()) return alert("Please enter content");

		setSubmitting(true);

		const formData = new FormData();

		formData.append(
			"notice",
			JSON.stringify({
				title: form.title,
				content: form.content,
				published: form.published,
			}),
		);

		if (form.image) {
			formData.append("image", form.image);
		}

		try {
			if (selected) {
				await axios.put(`${API_URL}/${selected.id}`, formData, {
					headers: {
						Authorization: `Bearer ${Cookies.get("adminToken")}`,
					},
				});
			} else {
				await axios.post(API_URL, formData, {
					headers: {
						Authorization: `Bearer ${Cookies.get("adminToken")}`,
					},
				});
			}

			alert("Success!");
			resetForm();
			fetchNotices();
		} catch (err) {
			console.error(err);
			alert("Failed to save notice");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Delete this notice?")) return;

		try {
			await axios.delete(`${API_URL}/${id}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("adminToken")}`,
				},
			});

			fetchNotices();
		} catch (err) {
			console.error(err);
			alert("Failed to delete notice");
		}
	};

	const handleEdit = (notice: Notice) => {
		setSelected(notice);
		setForm({
			title: notice.title,
			content: notice.content,
			published: notice.published,
			image: null,
		});
	};

	return (
		<div className="min-h-screen bg-white text-black p-6">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-4xl font-bold mb-10">Notice Management</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				<div className="border-2 border-gray-300 p-8 rounded-xl shadow mb-10">
					<h2 className="text-2xl font-bold mb-6">
						{selected ? "Edit Notice" : "Add Notice"}
					</h2>

					<input
						type="text"
						placeholder="Notice Title"
						value={form.title}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
						className="border-2 border-gray-300 p-4 rounded w-full mb-4"
					/>

					<textarea
						value={form.content}
						onChange={(e) => setForm({ ...form, content: e.target.value })}
						rows={5}
						placeholder="Write notice content..."
						className="border-2 border-gray-300 p-4 rounded w-full resize-y"
					/>

					<div className="mt-4 flex items-center gap-3">
						<input
							id="published"
							type="checkbox"
							checked={form.published}
							onChange={(e) =>
								setForm({ ...form, published: e.currentTarget.checked })
							}
							className="h-4 w-4"
						/>
						<label htmlFor="published" className="font-semibold">
							Published (show on homepage popup)
						</label>
					</div>

					<div className="mt-6">
						<label className="font-semibold block mb-2">Image (optional)</label>
						<input
							type="file"
							onChange={handleFileChange}
							className="border p-3 rounded w-full"
						/>
					</div>

					{selected?.imageUrl && (
						<div className="mt-4">
							<p className="text-sm text-gray-600 mb-2">Current image:</p>
							<div className="relative h-40 w-full max-w-sm overflow-hidden rounded border border-gray-200">
								<Image
									src={selected.imageUrl}
									alt={selected.title}
									fill
									className="object-cover"
								/>
							</div>
						</div>
					)}

					<div className="flex gap-4 mt-6">
						<button
							onClick={handleSubmit}
							disabled={submitting}
							className="bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded font-semibold"
						>
							{selected
								? submitting
									? "Updating..."
									: "Update"
								: submitting
									? "Creating..."
									: "Create"}
						</button>

						{selected && (
							<button
								onClick={resetForm}
								className="bg-gray-400 text-white px-6 py-3 rounded"
							>
								Cancel
							</button>
						)}
					</div>
				</div>

				<h2 className="text-2xl font-bold mb-6">Notices ({notices.length})</h2>

				{loading ? (
					<p>Loading...</p>
				) : notices.length === 0 ? (
					<div className="bg-gray-100 p-10 rounded text-center">No notices yet</div>
				) : (
					<div className="space-y-5">
						{notices.map((notice) => (
							<div key={notice.id} className="border-2 p-6 rounded-xl shadow">
								<div className="flex items-center justify-between gap-3">
									<h3 className="font-bold text-xl">{notice.title}</h3>
									<span
										className={`text-sm px-3 py-1 rounded-full ${
											notice.published
												? "bg-green-100 text-green-700"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										{notice.published ? "Published" : "Draft"}
									</span>
								</div>

								<p className="text-gray-700 mt-3 whitespace-pre-line">
									{notice.content}
								</p>

								{notice.imageUrl && (
									<Image
										src={notice.imageUrl}
										alt={notice.title}
										className="w-44 h-32 object-cover mt-4 rounded border border-gray-200"
										height={128}
										width={176}
									/>
								)}

								<div className="flex gap-3 mt-4">
									<button
										onClick={() => handleEdit(notice)}
										className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer px-4 py-2 rounded"
									>
										Edit
									</button>

									<button
										onClick={() => handleDelete(notice.id)}
										className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
