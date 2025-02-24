"use server"

import { Timeline } from "@/components/aceternity/timeline"
import { getEntries } from "./actions"


export default async function Page(){
    const data = await getEntries();
    return (
        <>
        <Timeline data={data}></Timeline>
        </>
    )
}