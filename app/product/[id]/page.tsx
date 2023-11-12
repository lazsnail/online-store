"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Item = {
	id: number;
	name: string;
	price: number;
	description: string;
	image_url: string;
};

export default function ItemPage({ params }: { params: { id: string } }) {
	const [data, setData] = useState<Item>();

	useEffect(() => {
		const supabase = createClientComponentClient();
		supabase
			.from("store_items")
			.select("*")
			.eq("id", params.id)
			.single()
			.then(({ data, error }) => {
				if (error) {
					console.error(error);
				} else setData(data);
			});
	}, [params]);

	async function updateCart(item: Item) {
		try {
			let data = window.localStorage.getItem("cart");
			if (data) {
				let cart = JSON.parse(data) as number[];
				cart.push(item.id);
				window.localStorage.setItem("cart", JSON.stringify(cart));
				toast("Added item to cart");
			} else {
				window.localStorage.setItem("cart", JSON.stringify([]));
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center gap-4 p-5 bg-black text-white pt-32">
			<div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4 ">
				<div className="grid items-center justify-end">
					<Image
						width={200}
						height={200}
						src={data?.image_url ?? ""}
						alt="Item image"
					/>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center text-center sm:text-left">
					<span className="text-2xl font-bold w-full">
						{data?.name}
					</span>
					<i className="w-full">{data?.description}</i>
					<span className="w-full">${data?.price}</span>
					<span className="w-full">In Stock</span>
				</div>
			</div>

			<button
				onClick={() => data && updateCart(data)}
				className="border-2 border-white w-fit p-2 hover:bg-white hover:text-black transition"
			>
				Add to cart
			</button>
		</div>
	);
}
