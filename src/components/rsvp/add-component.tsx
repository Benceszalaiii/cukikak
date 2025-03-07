"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import AddRSVPForm from './form';


export default function AddRSVP(){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>+</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>RSVP létrehozása</DialogTitle>
                <AddRSVPForm />
            </DialogContent>
        </Dialog>
    )
}