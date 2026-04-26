"""Contact routes — form submissions and inquiries."""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)


class ContactIn(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    phone: Optional[str] = None
    inquiry_type: str = Field(min_length=1)
    message: str = Field(min_length=1)


class ContactOut(BaseModel):
    success: bool
    message: str


@router.post("", response_model=ContactOut)
def submit_contact(body: ContactIn) -> ContactOut:
    logger.info(
        "[Contact] name=%s email=%s type=%s",
        body.name,
        body.email,
        body.inquiry_type,
    )
    return ContactOut(
        success=True,
        message="Thanks for reaching out! We'll get back to you soon.",
    )
