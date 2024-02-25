"use client";
import { Form } from "@/utils/components";
import { ascii_art_genrator } from "@/utils/functions";
import { useForm } from "@/utils/hooks";
import { RefObject, useRef, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<null | string>(null);
  const [hasImage, setHasImage] = useState<boolean>(false);
  const canvas_ref: RefObject<HTMLCanvasElement> = useRef(null);
  function toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const formik = useForm({
    initial: {
      resolution: "5",
      color_type: "original",
      color: "#000000",
      font: 2,
    },
    onSubmit: function (values) {
      if (image && values && canvas_ref.current) {
        return ascii_art_genrator(canvas_ref, values, image, setHasImage);
      }
    },
  });

  return (
    <>
      <div className="m-auto" style={{ padding: "50px" }}>
        {image ? (
          <div className="p-[20px] border-white border-2 rounded-3xl flex">
            <Form formik={formik} />
          </div>
        ) : (
          <label
            id="image"
            className="aspect-square max-w-[30rem] w-[90vw] border-white border-2 rounded-3xl flex"
          >
            <div className="m-auto text-lg text-white flex flex-col justify-center items-center gap-5">
              <p>Drag / Drop image here</p>
              <p className="text-center">Or</p>
              <p className="text-center">Choose File</p>
            </div>
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                if (e.currentTarget.files) {
                  const file = (await toBase64(
                    e.currentTarget.files[0]
                  )) as string;
                  if (file) {
                    setImage(file);
                  }
                }
              }}
            />
          </label>
        )}
      </div>
      {image && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {hasImage && (
            <div
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "2rem",
                  minWidth: "250px",
                }}
                onClick={() => {
                  if (canvas_ref.current) {
                    if (canvas_ref.current.width && canvas_ref.current.height) {
                      const image = canvas_ref.current.toDataURL("image/png");
                      const a = document.createElement("a");
                      a.href = image;
                      a.download = "ascii_art";
                      a.click();
                      a.remove();
                    }
                  }
                }}
              >
                Download as png
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "2rem",
                  minWidth: "250px",
                }}
                onClick={() => {
                  setImage(null);
                  setHasImage(false);
                }}
              >
                Reset
              </button>
            </div>
          )}
          <canvas
            style={{
              backgroundColor: "black",
              display: hasImage ? "block" : "none",
              border: "2px solid white",
            }}
            ref={canvas_ref}
          ></canvas>
        </div>
      )}
    </>
  );
}
