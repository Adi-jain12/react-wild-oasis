import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin cannot be deleted");

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. Create/edit cabin

  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  //B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin cannot be created");
  }

  // 2. Upload image in bucket
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there is an error in storing image in bucket after creating cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      "Cabin image could not be upload and cabin was also not created"
    );
  }

  return data;
};
