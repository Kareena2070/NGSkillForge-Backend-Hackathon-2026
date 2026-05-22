const Course = require("../../models/course.model");

const createCourseService = async (payload, user) => {
  const { title, description, thumbnail } = payload;

  const course = await Course.create({
    title,

    description,

    thumbnail,

    instructor: user._id,
  });

  return course;
};

const getCoursesService = async (query) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  // Dynamic Filter Object
  const filter = {};

  // Search by title
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  // Filter by instructor
  if (query.instructor) {
    filter.instructor = query.instructor;
  }

  const totalCourses = await Course.countDocuments(filter);
  let sortOption = { createdAt: -1 };

  if (query.sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  if (query.sort === "a-z") {
    sortOption = { title: 1 };
  }

  const courses = await Course.find(filter)
    .populate("instructor", "name email role")
    .skip(skip)
    .limit(limit)
    .sort(sortOption);

  return {
    courses,
    pagination: {
      total: totalCourses,
      page,
      limit,
      totalPages: Math.ceil(totalCourses / limit),
    },
  };
};

const Enrollment = require("../../models/enrollment.model");

const getInstructorDashboardService =
    async (userId) => {

        // Instructor Courses
        const courses = await Course.find({
            instructor: userId
        });

        // Course IDs
        const courseIds = courses.map(
            course => course._id
        );

        // Total Enrollments
        const totalEnrollments =
            await Enrollment.countDocuments({
                course: { $in: courseIds }
            });

        return {

            totalCourses: courses.length,

            totalEnrollments,

            courses

        };

    };

module.exports = {
    createCourseService,
    getCoursesService,
    getInstructorDashboardService
};
