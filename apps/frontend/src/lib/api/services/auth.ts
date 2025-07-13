import axiosInstance from "@/lib/api/axios";
import { User } from "@/types/user";

export async function getMe(): Promise<User> {
  return axiosInstance
    .get<User>("/user/me")
    .then((res) => res.data)
    .catch((err) => {
      const errorMessage =
        err.response?.data?.message || "Error al obtener el usuario";
      throw new Error(errorMessage);
    });
}
