# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "Album", primary_key: "AlbumId", force: :cascade do |t|
    t.string  "Title",    limit: 160, null: false
    t.integer "ArtistId",             null: false
    t.index ["AlbumId"], name: "IPK_Album", unique: true
    t.index ["ArtistId"], name: "IFK_AlbumArtistId"
  end

  create_table "Artist", primary_key: "ArtistId", force: :cascade do |t|
    t.string "Name", limit: 120
    t.index ["ArtistId"], name: "IPK_Artist", unique: true
  end

  create_table "Customer", primary_key: "CustomerId", force: :cascade do |t|
    t.string  "FirstName",    limit: 40, null: false
    t.string  "LastName",     limit: 20, null: false
    t.string  "Company",      limit: 80
    t.string  "Address",      limit: 70
    t.string  "City",         limit: 40
    t.string  "State",        limit: 40
    t.string  "Country",      limit: 40
    t.string  "PostalCode",   limit: 10
    t.string  "Phone",        limit: 24
    t.string  "Fax",          limit: 24
    t.string  "Email",        limit: 60, null: false
    t.integer "SupportRepId"
    t.index ["CustomerId"], name: "IPK_Customer", unique: true
    t.index ["SupportRepId"], name: "IFK_CustomerSupportRepId"
  end

  create_table "Employee", primary_key: "EmployeeId", force: :cascade do |t|
    t.string   "LastName",   limit: 20, null: false
    t.string   "FirstName",  limit: 20, null: false
    t.string   "Title",      limit: 30
    t.integer  "ReportsTo"
    t.datetime "BirthDate"
    t.datetime "HireDate"
    t.string   "Address",    limit: 70
    t.string   "City",       limit: 40
    t.string   "State",      limit: 40
    t.string   "Country",    limit: 40
    t.string   "PostalCode", limit: 10
    t.string   "Phone",      limit: 24
    t.string   "Fax",        limit: 24
    t.string   "Email",      limit: 60
    t.index ["EmployeeId"], name: "IPK_Employee", unique: true
    t.index ["ReportsTo"], name: "IFK_EmployeeReportsTo"
  end

  create_table "Genre", primary_key: "GenreId", force: :cascade do |t|
    t.string "Name", limit: 120
    t.index ["GenreId"], name: "IPK_Genre", unique: true
  end

  create_table "Invoice", primary_key: "InvoiceId", force: :cascade do |t|
    t.integer  "CustomerId",                                            null: false
    t.datetime "InvoiceDate",                                           null: false
    t.string   "BillingAddress",    limit: 70
    t.string   "BillingCity",       limit: 40
    t.string   "BillingState",      limit: 40
    t.string   "BillingCountry",    limit: 40
    t.string   "BillingPostalCode", limit: 10
    t.decimal  "Total",                        precision: 10, scale: 2, null: false
    t.index ["CustomerId"], name: "IFK_InvoiceCustomerId"
    t.index ["InvoiceId"], name: "IPK_Invoice", unique: true
  end

  create_table "InvoiceLine", primary_key: "InvoiceLineId", force: :cascade do |t|
    t.integer "InvoiceId",                          null: false
    t.integer "TrackId",                            null: false
    t.decimal "UnitPrice", precision: 10, scale: 2, null: false
    t.integer "Quantity",                           null: false
    t.index ["InvoiceId"], name: "IFK_InvoiceLineInvoiceId"
    t.index ["InvoiceLineId"], name: "IPK_InvoiceLine", unique: true
    t.index ["TrackId"], name: "IFK_InvoiceLineTrackId"
  end

  create_table "MediaType", primary_key: "MediaTypeId", force: :cascade do |t|
    t.string "Name", limit: 120
    t.index ["MediaTypeId"], name: "IPK_MediaType", unique: true
  end

  create_table "Playlist", primary_key: "PlaylistId", force: :cascade do |t|
    t.string "Name", limit: 120
    t.index ["PlaylistId"], name: "IPK_Playlist", unique: true
  end

  create_table "PlaylistTrack", primary_key: ["PlaylistId", "TrackId"], force: :cascade do |t|
    t.integer "PlaylistId", null: false
    t.integer "TrackId",    null: false
    t.index ["PlaylistId", "TrackId"], name: "IPK_PlaylistTrack", unique: true
    t.index ["PlaylistId", "TrackId"], name: "sqlite_autoindex_PlaylistTrack_1", unique: true
    t.index ["TrackId"], name: "IFK_PlaylistTrackTrackId"
  end

  create_table "Track", primary_key: "TrackId", force: :cascade do |t|
    t.string  "Name",         limit: 200,                          null: false
    t.integer "AlbumId"
    t.integer "MediaTypeId",                                       null: false
    t.integer "GenreId"
    t.string  "Composer",     limit: 220
    t.integer "Milliseconds",                                      null: false
    t.integer "Bytes"
    t.decimal "UnitPrice",                precision: 10, scale: 2, null: false
    t.index ["AlbumId"], name: "IFK_TrackAlbumId"
    t.index ["GenreId"], name: "IFK_TrackGenreId"
    t.index ["MediaTypeId"], name: "IFK_TrackMediaTypeId"
    t.index ["TrackId"], name: "IPK_Track", unique: true
  end

end
