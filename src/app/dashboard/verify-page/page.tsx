"use client";

import { useState, useContext } from "react";
import useImgInput from "@/helpers/useImgInput";
import Image from "next/image";
import { TbCloudUpload } from "react-icons/tb";
import { useRouter } from "next/navigation";
import AuthContext from "@/components/AuthContext";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const VerifyPage = () => {
  const { user, checkUserLoggedIn }: any = useContext(AuthContext);
  const router = useRouter();

  const [img1, imgPreview1, bind1] = useImgInput();
  const [img2, imgPreview2, bind2] = useImgInput();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { account_no } = user;
    // const formData = new FormData();
    // formData.append("account_no", account_no);
    // formData.append("images[]", img1);
    // formData.append("images[]", img2);
    // try {
    //   const res = await fetch("/api/user/verify", {
    //     method: "POST",
    //     body: formData,
    //     keepalive: true,
    //   });
    //   const data = await res.json();
    //   setIsSubmitting(false);
    //   if (res.ok) {
    //     checkUserLoggedIn();
    //     router.push("/dashboard");
    //   } else {
    //     toast.error(data.message || "Documents not submitted. Something went wrong");
    //     console.error(data.message);
    //   }
    // } catch (err) {
    //   console.error({ err });
    //   toast.error("Documents not submitted. Something went wrong");
    // }

    const imgObjects = await Promise.all(
      [img1, img2].map(async (v) => {
        const formInput = new FormData();
        formInput.append("file", v);
        formInput.append("upload_preset", "u16vszak");
        const res = fetch(
          "https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload",
          {
            method: "POST",
            body: formInput,
          }
        );
        return (await res).json();
      })
    );
    const [identity_doc, address_doc] = imgObjects.map((a) => a.secure_url);

    if (identity_doc && address_doc) {
      const VerificationSubmit = await fetch("/api/v1/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          account_no,
          address_doc,
          identity_doc,
        }),
      });
      const data = await VerificationSubmit.json();
      setIsSubmitting(false);
      if (VerificationSubmit.ok) {
        toast.success("Documents submitted successfully", {
          description:
            "We will verify as soon as possible. It may take a while",
        });
        checkUserLoggedIn();
        router.push("/dashboard");
      } else {
        toast.error(
          data.message || "Documents not submitted. Something went wrong"
        );
        console.error(data.message);
      }
    } else {
      setIsSubmitting(false);
      toast.error("Documents not submitted", {
        description: "Something went wrong",
      });
    }
  };

  return (
    <Card>
      {user?.verifying ? (
        <p className="text-center">
          Your documents have been submitted for Verification. <br /> Your
          Verification might take a while. Please be patient. Thank you
        </p>
      ) : (
        <>
          <h6 className="px-6">KYC Verification</h6>
          <div className="py px-6">
            <form onSubmit={submit} className="mx-auto block">
              <h5>IDENTITY VERIFICATION:</h5>
              <p className="text-sm">Upload a government issued ID card.</p>
              <label
                htmlFor="productImage1"
                className="flex relative cursor-pointer px-2 py-1 text-center border-border justify-center items-center border w-full max-w-xl aspect-video"
              >
                {!imgPreview1 ? (
                  <span className="flex flex-col items-center text-muted-foreground">
                    <TbCloudUpload className="text-4xl opacity-80" />
                    <p>Click here to upload an image</p>
                  </span>
                ) : (
                  <Image src={imgPreview1} alt="" fill />
                )}
                <input
                  {...bind1}
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  id="productImage1"
                  hidden
                  required
                />
              </label>
              <h5 className="mt-8">ADDRESS VERIFICATION:</h5>
              <p className="text-sm">
                Upload a document that can be used to verify your address. (e.g
                Utility bill)
              </p>
              <label
                htmlFor="productImage2"
                className="flex relative cursor-pointer px-2 py-1 text-center border-border justify-center items-center border w-full max-w-xl aspect-video"
              >
                {!imgPreview1 ? (
                  <span className="flex flex-col items-center text-muted-foreground">
                    <TbCloudUpload className="text-4xl opacity-80" />
                    <p>Click here to upload an image</p>
                  </span>
                ) : (
                  <Image src={imgPreview2} alt="" fill />
                )}
                <input
                  {...bind2}
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  id="productImage2"
                  hidden
                  required
                />
              </label>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="my-8 w-full max-w-xl"
              >
                {isSubmitting && <Loader className="animate-spin" />}
                Submit
              </Button>
            </form>
          </div>
        </>
      )}
    </Card>
  );
};

export default VerifyPage;
