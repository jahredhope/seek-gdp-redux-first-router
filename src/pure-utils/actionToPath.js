// @flow
import { compileParamsToPath } from 'rudy-match-path'
import type {
  Route,
  Payload,
  Params,
  RoutesMap,
  ReceivedAction as Action,
  QuerySerializer
} from '../flow-types'

export default (
  action: Action,
  routesMap: RoutesMap,
  serializer?: QuerySerializer
): string => {
  const route = routesMap[action.type]
  const routePath = typeof route === 'object' ? route.path : route
  const params = _payloadToParams(route, action.payload)
  let path = compileParamsToPath(routePath, params) || '/'
  try {
    path = decodeURIComponent(path)
  }
  catch (e) {
    // Ok
  }
  const query =
    action.query ||
    (action.meta && action.meta.query) ||
    (action.payload && action.payload.query)

  const search = query && serializer && serializer.stringify(query)

  return search ? `${path}?${search}` : path
}

const _payloadToParams = (route: Route, params: Payload = {}): Params =>
  Object.keys(params).reduce((sluggifedParams, key) => {
    const segment = params[key]
    sluggifedParams[key] = transformSegment(segment, route, key)
    return sluggifedParams
  }, {})

const transformSegment = (segment: string, route: Route, key: string) => {
  if (typeof route.toPath === 'function') {
    return route.toPath(segment, key)
  }
  else if (typeof segment === 'string') {
    if (segment.indexOf('/') > -1) {
      return segment.split('/')
    }

    if (route.capitalizedWords === true) {
      return segment.replace(/ /g, '-').toLowerCase()
    }

    return segment
  }
  else if (typeof segment === 'number') {
    return segment
  }
}
