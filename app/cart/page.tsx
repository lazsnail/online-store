"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Item = {
	id: number;
	name: string;
	price: number;
	description: string;
	image_url: string;
};

export default function CartPage() {
	const [cart, setCart] = useState([]);
	const [items, setItems] = useState<Item[]>();

	useEffect(() => {
		const data = window.localStorage.getItem("cart");
		if (data) {
			let cart = JSON.parse(data);
			console.log(cart);
			setCart(cart);
		} else {
			window.localStorage.setItem("cart", JSON.stringify([]));
			setCart([]);
		}

		const supabase = createClientComponentClient();

		supabase
			.from("store_items")
			.select("*")
			.then(({ data, error }) => {
				if (error) {
					console.error(error);
				} else setItems(data);
			});
	}, []);

	function clearCart(): void {
		window.localStorage.setItem("cart", JSON.stringify([]));
		setCart([]);
	}

	function removeItem(item: never) {
		console.log(item);
		const data = window.localStorage.getItem("cart");
		if (data) {
			let cart = JSON.parse(data);
			console.log(cart.indexOf(item));
			cart.splice(cart.indexOf(item), 1);
			window.localStorage.setItem("cart", JSON.stringify(cart));
			setCart(cart);
            toast("Removed item from cart")
		}
	}

	return (
		<div className="w-screen h-screen pt-28 bg-black text-white">
			<h1 className="text-2xl text-center mt-8 font-bold">Your Cart</h1>
			<button
				className="my-3 ml-2 border-2 border-white p-2"
				onClick={() => clearCart()}
			>
				Clear cart
			</button>
			<div className="flex flex-wrap gap-4 p-2">
				{cart.length === 0 && (
					<span className="p-2">Cart is empty</span>
				)}
				{cart.length > 0 &&
					cart.map((item, index) => {
						const store_item = items?.find((x) => x.id === item);

						return (
							<div
								key={index}
								className="flex p-2 w-fit gap-4 border-2 border-white"
							>
								<button
									onClick={() => {
										removeItem(item);
									}}
								>
									X
								</button>
								<span>${store_item?.price}</span>
								<Link
									href={`/product/${encodeURIComponent(
										item
									)}`}
									className="font-bold"
								>
									{store_item?.name}
								</Link>
							</div>
						);
					})}
			</div>
			<ToastContainer autoClose={1500} position="bottom-right" theme="dark"/>
		</div>
	);
}
