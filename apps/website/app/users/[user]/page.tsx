import Button from "@/components/Button";
import { Modal, ToggleModal } from "@/components/Modal";
import { getAuthenticatedUser, getUser } from "@/server/queries/users";
import { notFound } from "next/navigation";

export default async function User(props: { params: { user: string } }) {
  const authenticatedUser = await getAuthenticatedUser();
  const user = await getUser({ user: props.params.user });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
        <div className="max-w-2xl w-full">
          <div className="flex justify-between gap-6 p-6 w-full rounded-xl bg-grey-800">
            <div className="flex gap-4">
              <img
                src={user.image}
                className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="text-white text-2xl leading-none font-luckiest-guy">
                    {user.name}
                  </h1>
                  <h2 className="text-lg">@{user.handle}</h2>
                </div>
                <p>{user.bio}</p>
              </div>
            </div>
            {authenticatedUser?.id === user.id ? (
              <ToggleModal id="edit-profile">
                <Button
                  href={`https://warpcast.com/${user.farcaster?.username}`}
                >
                  Edit Profile
                </Button>
              </ToggleModal>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Modal id="edit-profile">
        <div>dadf</div>
      </Modal>
    </>
  );
}
