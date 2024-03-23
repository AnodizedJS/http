

export type TextMimeType =
  | 'text/plain'
  | 'text/html'
  | 'text/css'
  | 'text/javascript'
  | 'text/csv'
  | 'text/xml'
  | 'text/calendar'
  | 'text/markdown'
  | 'text/cache-manifest'
  | 'text/vcard'
  | 'text/vtt'
  ;

export type ImageMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/bmp'
  | 'image/webp'
  | 'image/svg+xml'
  | 'image/tiff'
  ;

export type ApplicationMimeType =
  | 'application/json'
  | 'application/xml'
  | 'application/pdf'
  | 'application/ld+json'
  | 'application/zip'
  | 'application/javascript'
  | 'application/xhtml+xml'
  | 'application/octet-stream'
  | 'application/rss+xml'
  | 'application/font-woff'
  | 'application/x-www-form-urlencoded'
  ;

export type VideoMimeType =
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'video/mpeg'
  | 'video/quicktime'
  | 'video/x-msvideo'
  | 'video/x-ms-wmv'
  | 'video/x-flv'
  | 'video/x-matroska'
  | 'video/x-ms-asf'
  ;

export type AudioMimeType =
  | 'audio/mpeg'
  | 'audio/wav'
  | 'audio/ogg'
  | 'audio/midi'
  | 'audio/aac'
  | 'audio/mp4'
  | 'audio/webm'
  | 'audio/x-ms-wma'
  | 'audio/vnd.rn-realaudio'
  | 'audio/flac'
  ;



export type MimeType = TextMimeType | ImageMimeType | ApplicationMimeType | VideoMimeType | AudioMimeType;