"use client";

import { pinImage } from "@/server/mutations/pinImage";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import toast from "react-hot-toast";
import Shimmer from "./Shimmer";
import { twMerge } from "tailwind-merge";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function FileUpload(props: {
  type: "image" | "video";
  asset?: string;
  setAsset: Dispatch<SetStateAction<string | undefined>>;
  className?: string;
}) {
  const uploadFileAction = useAction(pinImage);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const maxSizeMB = {
        image: 25,
        video: 100,
      }[props.type];

      if (file.size > maxSizeMB * 1024 * 1024) {
        return toast.error(
          `${
            { image: "Image", video: "Video" }[props.type]
          } size should be less than ${maxSizeMB} MB`
        );
      }

      const formData = new FormData();
      formData.append("file", file);

      const hash = await uploadFileAction.executeAsync({ formData });

      if (!hash?.data || hash?.serverError) {
        return toast.error("Could not upload image");
      }

      props.setAsset(`https://ipfs.nouns.gg/ipfs/${hash.data}`);

      event.target.value = "";
    }
  }

  return (
    <label
      className={twMerge(
        "relative flex items-center gap-1 cursor-pointer w-full rounded-xl overflow-hidden",
        props.asset && "h-60",
        props.className
      )}
    >
      {!props.asset ? (
        <p className="flex items-center gap-1 text-red hover:opacity-80 transition-opacity cursor-pointer">
          Upload {props.type}
          {uploadFileAction.isPending ? (
            <img src="/spinner.svg" className="h-[18px] animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </p>
      ) : null}
      {props.asset ? <Shimmer /> : null}
      {props.type === "image" && props.asset ? (
        <img
          src={props.asset}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : null}
      {props.type === "video" && props.asset ? (
        <video
          src={props.asset}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : null}
      <input
        type="file"
        accept={{ image: "image/*", video: "video/*" }[props.type]}
        onChange={upload}
        className="hidden"
      />
    </label>
  );
}
