"use server";

import ProductCard from "@/components/shop/card";
import { getProducts } from "./actions";


export default async function Page(){
    const products = await getProducts();
    
    return (
        <main className="py-24 w-full min-h-screen">
        <section className="flex flex-wrap w-full px-8 gap-4 p-4">
        {products.map((item, index)=> {
            return (
                <ProductCard data={item} key={index} />
            )
        })}
        </section>
        </main>
    )
}