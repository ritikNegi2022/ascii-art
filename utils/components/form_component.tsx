import { useForm } from "../hooks";
import { form_control_return } from "../type_declaration";

export default function Form({ formik }: { formik: form_control_return }) {
  return (
    <form onSubmit={formik.HandleSubmit} className="m-auto text-white">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          paddingBlock: "20px",
          paddingInline: "25px",
          borderBottom: "2px solid white",
        }}
      >
        <label htmlFor="resolution">Resolution {formik.resolution} px</label>
        <input
          type="range"
          name="resolution"
          id="resolution"
          min={1}
          step={1}
          max={10}
          onChange={formik.HandleChange}
          value={formik.resolution}
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          paddingBlock: "20px",
          paddingInline: "10px",
          borderBottom: "2px solid white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <p>Color Type : </p>
        <div className="flex" style={{ gap: "10px" }}>
          <label
            htmlFor="original"
            style={{
              border: "2px solid white",
              paddingInline: "10px",
              paddingBlock: "3px",
              borderRadius: "2rem",
              cursor: "pointer",
              backgroundColor:
                formik.color_type === "original" ? "white" : "transparent",
              color: formik.color_type === "original" ? "black" : "white",
            }}
          >
            Original
          </label>
          <input
            type="radio"
            name="color_type"
            id="original"
            value="original"
            onChange={formik.HandleChange}
            checked={formik.color_type === "original"}
            className="hidden"
          />
          <label
            htmlFor="custom"
            style={{
              border: "2px solid white",
              paddingInline: "10px",
              paddingBlock: "3px",
              borderRadius: "2rem",
              cursor: "pointer",
              backgroundColor:
                formik.color_type === "custom" ? "white" : "transparent",
              color: formik.color_type === "custom" ? "black" : "white",
            }}
          >
            Custom
          </label>
          <input
            type="radio"
            name="color_type"
            id="custom"
            value="custom"
            onChange={formik.HandleChange}
            checked={formik.color_type === "custom"}
            className="hidden"
          />
        </div>
        {formik.color_type === "custom" && (
          <div>
            <input
              type="color"
              name="color"
              id="color"
              value={formik.color}
              onChange={formik.HandleChange}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          paddingBlock: "20px",
          paddingInline: "25px",
          borderBottom: "2px solid white",
        }}
      >
        <label htmlFor="font">Font Multiplier {formik.font} </label>
        <input
          type="range"
          name="font"
          id="font"
          step={0.05}
          min={1}
          max={10}
          onChange={formik.HandleChange}
          value={formik.font}
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingBlockStart: "20px",
        }}
      >
        <button
          type="submit"
          style={{
            border: "2px solid white",
            paddingInline: "10px",
            paddingBlock: "3px",
            borderRadius: "2rem",
            width: "150px",
          }}
        >
          Genearate
        </button>
      </div>
    </form>
  );
}
