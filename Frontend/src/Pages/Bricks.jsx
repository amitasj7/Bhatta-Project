import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Bricks.css"; // Ensure to import the CSS file

export const Bricks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bricks/add`,
        data
      ); // Adjust URL as needed
      console.log("Response:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Add Brick Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Price 1:</label>
          <input
            type="number"
            {...register("price1", {
              required: "Price 1 is required",
              valueAsNumber: true,
            })}
          />
          {errors.price1 && <p className="error">{errors.price1.message}</p>}
        </div>

        <div className="form-group">
          <label>Price 2:</label>
          <input
            type="number"
            {...register("price2", {
              required: "Price 2 is required",
              valueAsNumber: true,
            })}
          />
          {errors.price2 && <p className="error">{errors.price2.message}</p>}
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" {...register("availability")} />
            Availability
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
