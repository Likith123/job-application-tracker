// Reduce colors of navigation links for signed-in users

const SignedInNavLinks = [
  {
    name: "wishlistJobs",
    href: "/dashboard/wishlist-jobs",
    label: "Wish List Jobs",
    color: "bg-yellow-400 text-white",
  },
  {
    name: "appliedJobs",
    href: "/dashboard/applied-jobs",
    label: "Applied Jobs",
    color: "bg-blue-400 text-white",
  },
  {
    name: "interviews",
    href: "/dashboard/interviews",
    label: "Interviews",
    color: "bg-purple-400 text-white",
  },
  {
    name: "successfulOffers",
    href: "/dashboard/successful-offers",
    label: "Successful Offers",
    color: "bg-green-400 text-white",
  },
  {
    name: "rejectedApplications",
    href: "/dashboard/rejected-applications",
    label: "Rejected Applications",
    color: "bg-red-400 text-white",
  },
];

export { SignedInNavLinks };
