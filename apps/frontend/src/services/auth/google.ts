export const loginWithGoogle = async (idToken: string) => {
  try {
    const response = await fetch("http://localhost:8000/auth/google", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al autenticar con el backend"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};
