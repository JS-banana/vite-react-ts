// import { customAlphabet } from 'nanoid';
// import React from 'react';
// import type { RouteProps } from 'react-router-dom';
// import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// // import NoFoundPage from "@/pages/404";
// import { useRecoilValue } from 'recoil';

// import { permissionState, userInfoState } from '@/store';

// const globalConfig = require('../../../config/config');

// interface RouteConfig extends Omit<RouteProps, 'component'> {
//   redirect?: string;
//   routes?: RouteConfig[];
//   component?: string;
//   key?: string | number;
//   title?: string;
//   tips?: string;
//   module?: string;
//   hideMenu?: boolean;
//   auth: boolean;
//   hideBreadcrumb: boolean; // 隐藏 pageWrapper
// }

// export interface RouteComponentConfig extends Omit<RouteConfig, 'component' | 'routes'> {
//   routes?: RouteComponentConfig[];
//   component?: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
// }

// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

// const parseRoutesToComponent = (routes: RouteConfig[]): RouteComponentConfig[] =>
//   routes.map(({ component, routes: childRoutes, ...other }) => ({
//     ...other,
//     component: component ? React.lazy(() => import(`@/${component}`)) : undefined,
//     routes: childRoutes ? parseRoutesToComponent(childRoutes) : undefined,
//   }));

// const generateRoutes = (routes: RouteComponentConfig[]) => {
//   return (
//     <Switch>
//       {routes.map(
//         ({
//           path,
//           component: Component,
//           routes: childRoutes,
//           redirect,
//           title,
//           hideMenu = false,
//           ...other
//         }) =>
//           redirect ? (
//             <Redirect key={nanoid()} exact from={path as string} to={redirect} />
//           ) : path ? (
//             <Route
//               key={nanoid()}
//               path={path}
//               {...other}
//               render={(routeProps) => {
//                 return Component ? (
//                   <Component
//                     routes={childRoutes}
//                     title={title}
//                     hideMenu={hideMenu}
//                     {...routeProps}>
//                     {childRoutes ? generateRoutes(childRoutes) : null}
//                   </Component>
//                 ) : null;
//               }}
//             />
//           ) : (
//             <Route
//               path="*"
//               key={nanoid()}
//               {...other}
//               render={(routeProps) => {
//                 return Component ? (
//                   <Component routes={childRoutes} title={title} {...routeProps}>
//                     {childRoutes ? generateRoutes(childRoutes) : null}
//                   </Component>
//                 ) : null;
//               }}
//             />
//           ),
//       )}
//     </Switch>
//   );
// };

// const filterPermissionRoutes = (
//   routes: RouteConfig[],
//   permissions: string[],
// ): RouteConfig[] => {
//   return routes
//     .filter((item) => !item.auth || permissions.includes(item.module || ''))
//     .map((item) => {
//       if (item.routes) {
//         const aaa = filterPermissionRoutes(item.routes, permissions);
//         if (aaa.length && aaa[0].redirect) {
//           return aaa.length > 2
//             ? {
//                 ...item,
//                 routes: [
//                   {
//                     ...aaa[0],
//                     redirect: aaa[1].path,
//                   },
//                   ...aaa.slice(1),
//                 ],
//               }
//             : undefined;
//         } else {
//           return item;
//         }
//       } else {
//         return item;
//       }
//     })
//     .filter((item) => item) as RouteConfig[];
// };

// const DqRoutes: React.FC = () => {
//   const userInfo = useRecoilValue(userInfoState);
//   const permissions = useRecoilValue(permissionState);
//   const permissionModuleNames = permissions.map(
//     (permissionItem) => permissionItem.module,
//   );

//   return (
//     <BrowserRouter>
//       {generateRoutes(
//         parseRoutesToComponent(
//           userInfo?.is_admin
//             ? globalConfig.routes
//             : filterPermissionRoutes(globalConfig.routes, permissionModuleNames),
//         ),
//       )}
//     </BrowserRouter>
//   );
// };

// export default DqRoutes;
export default {};
