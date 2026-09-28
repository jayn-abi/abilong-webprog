import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import { ArticleProvider } from "./context/ArticleContext";
import { MediaProvider } from "./context/MediaContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import PrivateRoute from "./components/PrivateRoute";

import Layout from "./layouts/Layout";
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ProjectsPage from './pages/LandingPages/ProjectsPage';
import ProjectDetailPage from './pages/LandingPages/ProjectDetailPage';
import SkillsPage from './pages/LandingPages/SkillsPage';
import ExperiencePage from './pages/LandingPages/ExperiencePage';
import ContactPage from './pages/LandingPages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

// Auth and dashboard (MUI, charts, data grid) load on demand so the
// public portfolio stays light.
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const SignInPage = lazy(() => import("./pages/AuthPages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/AuthPages/SignUpPage"));

const DashLayout = lazy(() => import("./layouts/DashLayout"));
const DashboardPage = lazy(() => import("./pages/DashboardPages/DashboardPage"));
const ReportsPage = lazy(() => import("./pages/DashboardPages/ReportsPage"));
const UsersPage = lazy(() => import("./pages/DashboardPages/UsersPage"));
const DashArticleListPage = lazy(() => import("./pages/DashboardPages/DashArticleListPage"));
const DashContentPage = lazy(() => import("./pages/DashboardPages/DashContentPage"));
const DashProjectsPage = lazy(() => import("./pages/DashboardPages/DashProjectsPage"));
const DashCertificationsPage = lazy(() => import("./pages/DashboardPages/DashCertificationsPage"));

const Loading = () => <div className="min-h-screen bg-(--base)" />;
const withSuspense = (el) => <Suspense fallback={<Loading />}>{el}</Suspense>;

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/',            element: <HomePage /> },
      { path: '/about',       element: <AboutPage /> },
      { path: '/projects',    element: <ProjectsPage /> },
      { path: '/projects/:id', element: <ProjectDetailPage /> },
      { path: '/skills',      element: <SkillsPage /> },
      { path: '/experience',  element: <ExperiencePage /> },
      { path: '/contact',     element: <ContactPage /> },
      { path: '/articles',    element: <ArticleListPage /> },
      { path: '/articles/:id', element: <ArticlePage /> },
    ],
  },
  {
    path: "auth/",
    element: withSuspense(<AuthLayout />),
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: withSuspense(<SignInPage />) },
      { path: "signup", element: withSuspense(<SignUpPage />) },
    ],
  },
  {
    path: "dashboard/",
    element: <PrivateRoute>{withSuspense(<DashLayout />)}</PrivateRoute>,
    errorElement: <NotFoundPage />,
    children: [
      { path: "",         element: withSuspense(<DashboardPage />) },
      { path: "reports",  element: withSuspense(<ReportsPage />) },
      { path: "articles", element: withSuspense(<DashArticleListPage />) },
      // Portfolio editors (admin only)
      ...[
        ["content", DashContentPage],
        ["projects", DashProjectsPage],
        ["certifications", DashCertificationsPage],
      ].map(([path, page]) => {
        const Page = page;
        return {
          path,
          element: <PrivateRoute allowedTypes={['admin']}>{withSuspense(<Page />)}</PrivateRoute>,
        };
      }),
      {
        path: "users",
        element: (
          <PrivateRoute allowedTypes={['admin']}>
            {withSuspense(<UsersPage />)}
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider>
      <ArticleProvider>
        <PortfolioProvider>
          <MediaProvider>
            <RouterProvider router={router} />
          </MediaProvider>
        </PortfolioProvider>
      </ArticleProvider>
    </ThemeProvider>
  );
}

export default App;
