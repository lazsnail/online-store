"use client";

import {
	createClientComponentClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
	}, []);

	async function updateCart(item: Item) {
		try {
			// If the passed value is a callback function,
			//  then call it with the existing state.
            let data = window.localStorage.getItem("cart")
            if (data) {
                let cart = JSON.parse(data) as number[];
                cart.push(item.id);
                window.localStorage.setItem("cart", JSON.stringify(cart));
                toast("Added item to cart")
            }
            else {
                window.localStorage.setItem("cart", JSON.stringify([]))
            }
        } catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="h-screen w-screen gap-10 flex bg-black text-white pt-28">
			<div className="w-1/2 grid items-center justify-end">
				<img width={200} height={200} src={data?.image_url} />
			</div>
			<div className="flex flex-col gap-2 w-1/2 justify-center">
				<span className="text-2xl font-bold w-full">{data?.name}</span>
				<i>{data?.description}</i>
				<span>${data?.price}</span>
				<span className="w-full">In Stock</span>
				<button
					onClick={() => data && updateCart(data)}
					className="border-2 border-white w-fit p-2 hover:bg-white hover:text-black transition"
				>
					Add to cart
				</button>
			</div>
            <ToastContainer autoClose={1500} position="bottom-right" theme="dark"/>
		</div>
	);
}
