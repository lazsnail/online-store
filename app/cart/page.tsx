"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Item = {
	id: number;
	name: string;
	price: number;
	description: string;
	image_url: string;
};

export default function CartPage() {
	const [cart, setCart] = useState<number[]>([]);
	const [storeItems, setStoreItems] = useState<Item[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const data = window.localStorage.getItem("cart");
		if (data) {
			setCart(JSON.parse(data) as number[]);
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
				} else {
					setStoreItems(data as Item[]);
				}
			});
	}, []);

	useEffect(() => {
		let x = 0;
		for (let i = 0; i < cart.length; i++) {
			const storeItem = storeItems.find((x) => x.id === cart[i]);
			x += storeItem?.price ?? 0;
		}
		setTotalPrice(x);
	}, [cart, storeItems]);

	function clearCart(): void {
		try {
			window.localStorage.setItem("cart", JSON.stringify([]));
			setCart([]);
			setTotalPrice(0);
		} catch (error) {
			toast.error("Error accessing cart");
		}
	}

	function removeItem(item: number) {
		try {
			const data = window.localStorage.getItem("cart");
			if (data) {
				let cart = JSON.parse(data);
				cart.splice(cart.indexOf(item), 1);
				window.localStorage.setItem("cart", JSON.stringify(cart));
				setCart(cart);
				toast("Removed item from cart");
			} else {
				toast.error("Error accessing cart");
			}
		} catch (error) {
			toast.error("Error accessing cart");
		}
	}

	return (
		<div className="w-screen h-screen pt-28 flex flex-col bg-black text-white p-2">
			<h1 className="text-2xl text-center mt-8 font-bold">Your Cart</h1>
			<button
				className="my-3 w-fit border-2 border-white p-2 hover:bg-white hover:text-black transition"
				onClick={() => clearCart()}
			>
				Clear cart
			</button>
			<span>
				Total Price: <b>${totalPrice}</b>
			</span>
			<div className="flex flex-wrap gap-4 mt-2">
				{cart.length === 0 && <span className="">Cart is empty</span>}
				{cart.length > 0 &&
					cart.map((item, index) => {
						const storeItem = storeItems.find((x) => x.id === item);

						return (
							<div
								key={index}
								className="flex items-center p-2 w-fit gap-4 border-2 border-white"
							>
								<button
									onClick={() => {
										removeItem(item);
									}}
									className="hover:bg-white hover:text-black transition p-2"
								>
									X
								</button>
								<Image
									width={50}
									height={50}
									src={storeItem?.image_url ?? ""}
									alt="Item image"
								></Image>
								<span>${storeItem?.price}</span>
								<Link
									href={`/product/${encodeURIComponent(
										item
									)}`}
									className="font-bold hover:bg-white hover:text-black transition p-2"
								>
									{storeItem?.name}
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
}
