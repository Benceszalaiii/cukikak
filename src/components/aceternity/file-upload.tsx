"use client";
import { uploadFile } from "@/app/gallery/actions";
import NSFWFilter from "@/lib/filter";
import { cn } from "@/lib/utils";
import { IconUpload } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "../ui/button";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [file, setFile] = useState<{ file: File; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (loading) {
      return;
    }
    if (!newFiles[0].type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    setFile({ file: newFiles[0], url: URL.createObjectURL(newFiles[0]) });
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });
  const [loading, setLoading] = useState(false);
  async function handleUpload() {
    setLoading(true);
    if (file) {
      const isExplicit = !(await NSFWFilter.isSafe(file.file));
      if (isExplicit) {
        toast.error("A feltöltött fájl explicit tartalmat tartalmaz!");
      }
      try {
        const res = await uploadFile(file.file, isExplicit);
        toast.info(res.message);
      } catch (e: unknown) {
        toast.error(`${file.file.type} fájlformátum nem engedélyezett! `);
        console.log(e);
      }
      setFile(null);
      setLoading(false);
    }
  }
  return (
    <div
      className="w-full max-w-7xl my-12 border rounded-lg self-center"
      {...getRootProps()}
    >
      <motion.div
        className={cn(
          "p-10 group/file block rounded-lg w-full shadow-2xl relative overflow-hidden",
          loading && "pointer-events-none opacity-75"
        )}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Fájl feltöltése
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Kérlek töltsd fel a fájlt, amit szeretnél megosztani a többiekkel!
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file && (
              <motion.div
                key={"file"}
                layoutId={"file-upload"}
                onClick={handleClick}
                whileHover="animate"
                className={cn(
                  "relative z-40 cursor-pointer bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-4 mt-4 w-full mx-auto rounded-md",
                  "shadow-sm"
                )}
              >
                <Image
                  src={file.url}
                  alt="Preview"
                  width={64}
                  height={64}
                ></Image>
                <div className="overflow-hidden z-40 flex flex-col items-start justify-start md:h-24 w-full mx-auto rounded-md">
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      Utolsó módosítás:{" "}
                      {new Date(file.file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
            {!file && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                onClick={handleClick}
                whileHover="animate"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl cursor-pointer z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!file && (
              <motion.div
                variants={secondaryVariant}
                onClick={handleClick}
                whileHover="animate"
                className="absolute opacity-0 border border-dashed group-hover/file:opacity-100 border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
        {file && <Button onClick={handleUpload}>Feltöltés</Button>}
      </motion.div>
    </div>
  );
};
