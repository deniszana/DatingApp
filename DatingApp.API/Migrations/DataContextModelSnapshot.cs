﻿// <auto-generated />
using System;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatingApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0");

            modelBuilder.Entity("DatingApp.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("DATE");

                    b.Property<string>("Description")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<bool>("IsMain")
                        .HasColumnType("BIT");

                    b.Property<string>("Url")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("DatingApp.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<string>("Country")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("DATE");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("DATE");

                    b.Property<string>("Gender")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<string>("Interests")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<string>("Introduction")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<string>("KnownAs")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("DATE");

                    b.Property<string>("LookingFor")
                        .HasColumnType("VARCHAR(MAX)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .HasColumnType("VARCHAR(MAX)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DatingApp.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("VARCHAR(MAX)");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("DatingApp.API.Models.Photo", b =>
                {
                    b.HasOne("DatingApp.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
