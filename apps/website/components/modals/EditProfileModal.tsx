"use client";

import type { Nexus } from "~/packages/db/schema";
import Modal, { ToggleModal, useModal } from "../Modal.new";
import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import Button from "../Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pinImage } from "@/server/mutations/pinImage";
import { useAction } from "next-safe-action/hooks";
import { updateProfile } from "@/server/mutations/updateProfile";
import { useRouter } from "next/navigation";
import { Plus, RefreshCcw, Save, UserPen } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function EditProfileModal(props: { user: Nexus }) {
  const [tab, setTab] = useState<"profile" | "connections" | "advanced">(
    "profile"
  );

  const [image, setImage] = useState(props.user.image);
  const [name, setName] = useState(props.user.name);
  const [bio, setBio] = useState(props.user.bio);
  const [handle, setHandle] = useState(props.user.handle);

  const pinImageAction = useAction(pinImage);

  const { isOpen, close } = useModal("edit-profile");

  useEffect(() => {
    if (isOpen) {
      setImage(props.user.image);
      setName(props.user.name);
      setBio(props.user.bio);
      setHandle(props.user.handle);
    }
  }, [isOpen]);

  const updateProfileAction = useAction(updateProfile, {
    onSuccess: () => {
      console.log("success");
      close();
    },
  });

  return (
    <Modal id="edit-profile" className="p-4 flex flex-col min-w-80 gap-4">
      <p className="text-white text-2xl font-bebas-neue leading-none">
        Your Account
      </p>
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
        <TextInput
          value={handle}
          onChange={(value) => setHandle(value)}
          placeholder="Handle"
        />
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
          onClick={() => {
            updateProfileAction.execute({
              name,
              bio: bio ?? undefined,
              image,
            });
          }}
          className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
        >
          Save
          <UserPen className="w-4 h-4" />
        </button>
      </div>
    </Modal>
  );
}
