"use client";

import type { Nexus } from "~/packages/db/schema";
import { Modal, ToggleModal, useModal } from "../Modal";
import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import Button from "../Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pinImage } from "@/server/mutations/pinImage";
import { useAction } from "next-safe-action/hooks";
import { updateProfile } from "@/server/mutations/updateProfile";
import { useRouter } from "next/navigation";
import { Plus, RefreshCcw, Save, UserPen, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { usePrivy } from "@privy-io/react-auth";
import type { AuthenticatedUser } from "@/server/queries/users";

export default function EditProfileModal(props: { user: AuthenticatedUser }) {
  const [tab, setTab] = useState<"profile" | "connections" | "advanced">(
    "profile"
  );

  const [image, setImage] = useState(props.user.nexus?.image);
  const [name, setName] = useState(props.user.nexus?.name);
  const [bio, setBio] = useState(props.user.nexus?.bio);

  const pinImageAction = useAction(pinImage);

  const { isOpen, close } = useModal("edit-profile");

  const updateProfileAction = useAction(updateProfile, {
    onSuccess: () => {
      console.log("success");
      close();
    },
  });

  const { linkDiscord } = usePrivy();

  return (
    <Modal id="edit-profile" className="p-4 flex flex-col min-w-80 gap-4">
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl font-bebas-neue leading-none">
          Your Account
        </p>
        <button
          onClick={close}
          className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
        >
          <X className="w-4 h-4 text-grey-200" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTab("profile")}
          className={twMerge(
            "text-grey-400 text-lg font-semibold",
            tab === "profile" && "text-white"
          )}
        >
          Profile
        </button>
        <button
          onClick={() => setTab("connections")}
          className={twMerge(
            "text-grey-400 text-lg font-semibold",
            tab === "connections" && "text-white"
          )}
        >
          Connections
        </button>
        <button
          onClick={() => setTab("advanced")}
          className={twMerge(
            "text-grey-400 text-lg font-semibold",
            tab === "advanced" && "text-white"
          )}
        >
          Advanced
        </button>
      </div>
      <div className="flex items-center gap-4 h-12">
        <label className="cursor-pointer aspect-square h-full relative group">
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const files = event.target.files;

              if (files && files.length > 0) {
                const file = files[0];

                // 25 MB in bytes
                if (file.size > 25 * 1024 * 1024) {
                  toast.error("Image size should be less than 25 MB");
                  return;
                }

                const formData = new FormData();
                formData.append("file", file);

                const hash = await pinImageAction.executeAsync({ formData });

                if (hash?.data) {
                  setImage(`https://ipfs.nouns.gg/ipfs/${hash.data}`);
                } else toast.error("Could not upload image");

                event.target.value = "";
              }
            }}
            style={{ display: "none" }}
          />
          <img src={image} className="rounded-full" />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-0 right-0 w-full h-full flex items-center justify-center bg-black/50 text-white">
            <Plus className="w-5 h-5" />
          </div>
        </label>
      </div>
      <div className="flex flex-col gap-4">
        <TextInput
          label="Display name"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Display name"
        />

        <TextArea
          label="Bio"
          value={bio ?? undefined}
          onChange={(value) => setBio(value)}
          placeholder="Bio"
          lines={3}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {}}
          className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
        >
          Save
          <UserPen className="w-4 h-4" />
        </button>
      </div>
    </Modal>
  );
}
