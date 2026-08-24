import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

export default function TrustRating() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "2px",
        bgcolor: "#f2f2f2",
        width: "fit-content",
      }}
    >
      {[1, 2, 3, 4].map((star) => (
        <Box
          key={star}
          sx={{
            width: 16,
            height: 16,
            bgcolor: "#A800B7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StarIcon
            sx={{
              color: "#fff",
              fontSize: 12,
            }}
          />
        </Box>
      ))}

      <Box
        sx={{
          width: 16,
          height: 16,
          background: "linear-gradient(to right, #A800B7 50%, #dcdce6 50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StarIcon
          sx={{
            color: "#fff",
            fontSize: 12,
          }}
        />
      </Box>
    </Box>
  );
}
